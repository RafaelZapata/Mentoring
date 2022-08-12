class Public {
  home(req, res) {
    return res.json({
      status: true,
      code: 200,
      message: "I hate you - again"
    });
  }

  notFound(req, res) {
    return res.json({
      status: false,
      code: 404,
      message: "Not Found"
    });
  }
}

export default new Public();
