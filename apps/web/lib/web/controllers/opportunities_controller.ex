defmodule Web.OpportunitiesController do
  use Web, :controller

  alias Data.Opportunities

  def index(conn, params) do
    json =
      params
      |> index_filters
      |> Opportunities.all
      |> format

    send_resp(conn, 200, Poison.encode!(json))
  end

  defp current_page(params), do: Map.get(params, "page", 1)

  defp format(opportunities), do: Enum.map(opportunities, &format_opportunity/1)

  defp format_opportunity(opportunity) do
    project = Map.take(opportunity.project, [:name, :id, :tags])

    opportunity
    |> Map.take([:level, :id, :title, :url])
    |> Map.merge(%{project: project})
  end

  defp level(%{"levels" => ""}), do: [1, 5, 9]
  defp level(params) do
    params
    |> Map.get("levels", "1,5,9")
    |> String.split(",")
    |> Enum.map(&String.to_integer/1)
  end

  defp index_filters(params) do
    %{
      include: :project,
      page: current_page(params),
      filters: %{
        level: level(params)
      }
    }
  end
end
