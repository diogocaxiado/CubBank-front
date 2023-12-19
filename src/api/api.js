import axios from "axios";

const instancia = axios.create({
  baseURL: "https://desafiofinal.onrender.com",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

export default instancia;
