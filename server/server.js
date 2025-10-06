const express = require("express"); // 引入 express
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// 🔥 添加这行：配置静态资源访问
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 设置 body-parser 选项，增加请求体大小限制
app.use(bodyParser.json({ limit: "50mb" })); // 允许最大 50MB 的 JSON 请求体
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // 允许最大 50MB 的 URL 编码请求体

// 设置 multer 存储引擎
const storage = multer.diskStorage({
  // 上传的文件要存储到哪里
  destination: function (req, file, cb) {
    // 上传的文件夹路径，需要在项目根目录下创建 uploads 子文件夹
    const uploadDir = path.join(__dirname, "uploads");
    // 如果 uploads 子文件夹不存在，则创建它
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // 上传的文件夹路径
    cb(null, "uploads");
  },
  // 上传的文件名字如何命名
  filename: function (req, file, cb) {
    // 给上传的文件一个唯一的后缀来保证不重名
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// 添加上传图片的路由接口
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    // 🔥 返回完整的URL
    const fullUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    res.status(200).send({
      message: "图片上传成功",
      imageUrl: fullUrl,
    });
  } catch (error) {
    res.status(500).send({ message: "图片上传失败" });
  }
});

app.listen(3001, () => {
  console.log("server is running at 3001");
});
