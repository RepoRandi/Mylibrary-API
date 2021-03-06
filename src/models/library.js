const connection = require("../helpers/mysql");
module.exports = {
  getAllLibraryModel: function () {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT title,description,image,genre,author,status FROM mybook JOIN mygenre ON mybook.id_genre=mygenre.id LEFT JOIN myauthor ON mybook.id_author=myauthor.id",
        function (error, result) {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  detailLibraryModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT mybook.id as id, mybook.title as title, mybook.description as description, mybook.image as image, mygenre.name as genre,myauthor.name as author, mybook.status as status, mybook.created_at as created_at, mybook.updated_at as updated_at FROM mybook INNER JOIN mygenre ON mybook.id_genre = mygenre.id INNER JOIN myauthor ON mybook.id_author = myauthor.id WHERE mybook.id = ?",
        id,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  postLibraryModel: function (setData) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO mybook SET ?", setData, function (
        error,
        result
      ) {
        if (error) {
          reject(error);
        }
        const newData = {
          id: result.insertId,
          ...setData,
        };
        resolve(newData);
      });
    });
  },
  updateLibraryModel: function (setData, id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE mybook SET ? WHERE id=?",
        [setData, id],
        function (error, result) {
          if (error) {
            reject(error);
          }
          const updateData = {
            id,
            ...setData,
          };
          // console.log(updateData)
          resolve(updateData);
        }
      );
    });
  },
  deleteLibraryModel: function (id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM mybook WHERE id=?", id, function (
        error,
        result
      ) {
        if (error) {
          reject(error);
        }

        resolve(`${"Data Id:"}${id} ${"Has Been Deleted"}`);
      });
    });
  },
  searchLibraryModel: function (data) {
    // console.log(search);
    // console.log(data);
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM mybook WHERE title=?", data, function (
        error,
        result
      ) {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  sortingLibraryModel: function (dataSort) {
    const sql = `SELECT * FROM mybook ORDER BY ${dataSort}`;
    return new Promise((resolve, reject) => {
      connection.query(sql, function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  pageLibraryModel: function (dataPage) {
    const page = dataPage;
    const limit = 2;
    const offset = (page - 1) * limit;
    console.log(dataPage);
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM mybook LIMIT ? OFFSET ?",
        [limit, offset],
        function (error, result) {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  searchSortPageLibraryModel: function (search, sort, pagination) {
    const page = pagination;
    const limit = 2;
    const offset = (page - 1) * limit;
    console.log("masuk sini");
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM mybook WHERE title=${search} ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`,
        function (error, result) {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
};
