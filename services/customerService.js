const CustomerModel = require('../models/customer');
const mongoose = require('mongoose').set('debug', true);
let maxId = 2;

module.exports = {
  getCustomers: async function () {
    let data = await CustomerModel.find({}).then((Customers) => {
      return Customers;
    })
      .catch((err) => {
        return 'error';
      });
    return data;
  },
  getCustomer: async function (id) {
    let data = await CustomerModel.findById(id)
      .then((doc) => {
        return doc;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    console.log(data);
    return data;
  },
  getCustomerByEmail: async function (email) {
    let data = await CustomerModel.findOne({email:email})
      .then((doc) => {
        return doc;
      })
      .catch((err) => {
        return err;
      });
    return data;
  }, deleteCustomer: async function (id) {
    let data = await CustomerModel.findByIdAndDelete(id)
      .then((doc) => {
        return doc;
      })
      .catch((err) => {
        return err;
      });
    return data;
  }
  ,
  updateCustomer: async function (customer, response) {
    let customerUpdate = new CustomerModel(customer);
    var err = customerUpdate.validateSync();
    if (err) {
      response.status = 400;
      return err;
    } else {
      customerUpdate = await CustomerModel.findByIdAndUpdate(customer._id, customer)
        .then(function (uCustomer) {
          console.log('Customer Update!', uCustomer);
          return uCustomer;
        })
        .catch(function (err) {
          response.status = 400;
          return err;
        })
      return customerUpdate;
    }
  },
  postCustomer: async function (customer, response) {
    let customerNew = new CustomerModel(customer);
    var err = customerNew.validateSync();
    if (err) {
      response.status = 400;
      return err;
    } else {
      console.log("Valido");
      customerNew = await CustomerModel.create(customer)
        .then(function (newCustomer) {
          console.log('New Customer Created!', newCustomer);
          return newCustomer;
        })
        .catch(function (err) {
          response.status = 400;
          return err;
        })
      return customerNew;
    }
  }
}
