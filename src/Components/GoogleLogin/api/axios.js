// 統一管理 login api 的檔案
import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:3000",
});
