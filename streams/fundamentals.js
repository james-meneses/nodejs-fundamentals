import { Readable, Transform, Writable } from "node:stream";

// Lê o dado e passa para o próximo stream
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(`${i}\n`, "utf-8");
        this.push(buf);
      }
    }, 100);
  }
}

class NegativeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

// Processa o dado
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new NegativeNumberStream())
  .pipe(new MultiplyByTenStream());
