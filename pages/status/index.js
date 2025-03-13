import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);

  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    const database = data.dependencies.database;

    databaseStatusInformation = (
      <>
        <div>
          Versão:
          {database.version}
        </div>
        <div>
          Conexões abertas:
          {database.opened_connections}
        </div>
        <div>
          Conexões máximas:
          {database.max_connections}
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Banco de Dados</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return <div>Ultima atualização: {updatedAtText}</div>;
}
