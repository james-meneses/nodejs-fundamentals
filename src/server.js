import http from "node:http";

const users = [];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });

    return res.writeHead(201).end("Criação de usuário");
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
