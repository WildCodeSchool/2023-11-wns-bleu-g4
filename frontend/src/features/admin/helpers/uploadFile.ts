import axios from "axios";

export default async function uploadFile(file: File) {
  const data = new FormData();
  data.append("file", file);
  const res = await axios.post<{ url: string }>("/uploads", data);
  return res.data.url;
}
