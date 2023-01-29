const Bill = require('../models/Bill');

const getBillsBySearch = async (req, res) => {
  const { search } = await req.params;
  //   const { page = 1, limit = 10 } = await req.query;
  // console.log(search);
  if (search.length >= 3) {
    try {
      // get total documents in the Bills collection
      //   const count = await Bill.countDocuments();
      const searchResult = await Bill.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ],
      })
        .sort({ createdAt: -1 })
        // .limit(parseInt(limit) * 1)
        // .skip((parseInt(page) - 1) * parseInt(limit))
        .select({
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        })
        .exec();
      res.status(200).json({
        message: 'Successfully showing result!!',
        data: searchResult,
        // totalPages: Math.ceil(count / limit),
        // currentPage: page,
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json({
        message: 'There is a server side error!',
        // error: err
      });
    }
  } else {
    res.status(401).json({ message: 'Something went wrong!' });
  }
};

// exporting modules
module.exports = {
  getBillsBySearch,
};
