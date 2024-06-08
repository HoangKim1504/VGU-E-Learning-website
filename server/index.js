// configs
const express = require("express");
const app = require("./src/app");
const db = require("./src/config/db");
const { TOKEN_SECRET, PORT } = require("./src/config/config");
// middlewares
const { verifyUser } = require("./src/middlewares/verifyUser");
const setHeaders = require("./src/middlewares/setHeaders");
const staticFiles = require("./src/middlewares/staticFiles");
const upload = require("./src/config/multerConfig");
// routes
const authRoutes = require("./src/routes/user/auth");
const signupRoutes = require("./src/routes/user/signup");
const forgotPasswordRoutes = require("./src/routes/user/forgotPassword");
const resetPasswordRoutes = require("./src/routes/user/resetPassword");
const logoutRoutes = require("./src/routes/user/logout");
const getUserRoutes = require("./src/routes/common/getUser");
const coursesRoutes = require("./src/routes/course/courses");
const courseInfoRoutes = require("./src/routes/course/courseInfo");
const postRoutes = require("./src/routes/course/coursePost");
const classworkInClassRoutes = require("./src/routes/course/classworkInClass");
const classworkHomeworkRoutes = require("./src/routes/course/classworkHomework");
const memberListRoutes = require("./src/routes/course/courseMemberList");
const coursePdfRoutes = require("./src/routes/course/coursePdf");
const classworkPdfRoutes = require("./src/routes/course/classworkPdf");
const getProfileRoutes = require("./src/routes/profile/getProfile");
const editProfileRoutes = require("./src/routes/profile/editProfile");
const uploadAvatarRoutes = require("./src/routes/profile/uploadAvatar");
const allProfileRoutes = require("./src/routes/profile/allProfile");
const catchAllRoutes = require("./src/routes/common/catchAll");

// middlewares
app.use(verifyUser);
app.use(setHeaders);
app.use(...staticFiles);
// parse the body
app.use(express.json()); // transfer the data that we are passing from frontend to backend that will transfer to the Json format

// routes
app.use("/auth", authRoutes);
app.use("/signup", signupRoutes);
app.use("/forgot-password", forgotPasswordRoutes);
app.use("/reset-password/:randomString", resetPasswordRoutes);
app.use("/logout", logoutRoutes);
app.use("/getUser", getUserRoutes);
app.use("/courses", coursesRoutes);
app.use("/courses/:title/course-info", courseInfoRoutes);
app.use("/courses/:title/post", postRoutes);
app.use("/courses/:title/classwork/in-class", classworkInClassRoutes);
app.use("/courses/:title/classwork/homework", classworkHomeworkRoutes);
app.use("/courses/:title/member-list", memberListRoutes);
app.use("/courses/:title/pdf", coursePdfRoutes);
app.use("/courses/:title/classwork/pdf", classworkPdfRoutes);
app.use("/getProfile", getProfileRoutes);
app.use("/editProfile", editProfileRoutes);
app.use("/editProfile/uploadAvatar", uploadAvatarRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
