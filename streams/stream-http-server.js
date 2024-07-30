import http from "node:http";
import { Transform } from "node:stream";

class NegativeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
  const buffers = [];

  // o for await of é uma forma de consumir um stream
  // ele significa que o loop vai esperar o próximo valor do stream, para só então continuar
  // a diferença entre stream e buffer é que o stream é um fluxo de dados, enquanto o buffer é um dado que já está disponível
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);
});

server.listen(3334);
