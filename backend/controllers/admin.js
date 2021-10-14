const User = require("../models/User");

const myCustomLabels = {
  totalDocs: "total",
  docs: "data",
  limit: "perPage",
  page: "page",
  totalPages: "pages",
};

class admin {
  async fetchUsers(req, res) {
    try {
      const { page, perPage, search } = req.query;

      let params = {};

      if (search) {
        params = {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        };
      }

      await User.paginate(
        params,
        {
          page: page || 1,
          limit: perPage || 15,
          customLabels: myCustomLabels,
        },
        function (err, result) {
          return res.json(result);
        }
      );
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

module.exports = new admin();
