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
          return res.status(200).json(result);
        }
      );
    } catch (err) {
      return res.status(400).json({
        message: "Возникла ошибка",
        description: "При запросе всех пользователей сайта возникла проблема",
      });
    }
  }
}

module.exports = new admin();
