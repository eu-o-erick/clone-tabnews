test("GET to /api/v1/status should return 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  expect(res.status).toBe(200);

  const resBody = await res.json();

  const parseUpdatedAt = new Date(resBody.update_at).toISOString();
  expect(parseUpdatedAt).toEqual(resBody.update_at);

  expect(resBody.dependencies.database.version).toBe("16.5");
  expect(resBody.dependencies.database.max_connections).toEqual(100);
  expect(resBody.dependencies.database.opened_connections).toEqual(1);
});
