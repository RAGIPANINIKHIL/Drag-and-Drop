import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import { ExcelDateToJSDate } from "./utils/ExcelDateToJSDate"
import Draggablecomponents from "./table-DraggableComponent/tabledraggableComponents";
import ChartsDraggablecomponents from "./charts-DraggableComponent/chartsdraggableComponents";

import BAR from "./utils/assets/bar.svg";
import LINE from "./utils/assets/line.svg";
import PIE from "./utils/assets/pie.svg";
import TABLE from './utils/assets/table.svg';


function App() {
  const [DataItems, setDataItems] = useState([]);
  const [SalesOrderID, setSalesOrderID] = useState({});
  const [Orderdate, setOrderdate] = useState([]);
  const [ShipDate, setShipDate] = useState([]);
  const [AccountNumber, setAccountNumber] = useState([]);
  const [ProductID, setProductID] = useState([]);
  const [Name, setName] = useState([]);
  const [Product_SUBCategory, setProduct_SUBCategory] = useState([]);
  const [ListPrice, setListPrice] = useState([]);
  const [UnitPrice, setUnitPrice] = useState([]);
  const [OrderQty, setOrderQty] = useState([]);
  const [StandardCost, setStandardCost] = useState([]);

  const [Items, setItems] = useState([]);


  const [coloumnNames, setColoumnNames] = useState([]);
  const [content, setContent] = useState('TABLE');

  let salesOrderID = [];
  let orderdate = [];
  let shipDate = [];
  let accountNumber = [];
  let productID = [];
  let name = [];
  let product_SUBCategory = [];
  let listPrice = [];
  let unitPrice = [];
  let orderQty = [];
  let standardCost = [];

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      dataparse(d)
      setItems(d);
    });
  };

  const dataparse = (items) => {
    for (let item of items) {
      for (let key in item) {
        switch (key) {
          case 'SalesOrderID': {
            salesOrderID.push(item[key]);
            SalesOrderID['value'] = salesOrderID;
            SalesOrderID['category'] = "wip";
            SalesOrderID['name'] = 'SalesOrderID';
            setSalesOrderID(SalesOrderID);
          } break;
          case 'OrderDate': {
            let date = ExcelDateToJSDate(item[key]);            
            orderdate.push(date);
            Orderdate['value'] = orderdate;
            Orderdate['category'] = "wip";
            Orderdate['name'] = 'OrderDate';
            setOrderdate(Orderdate);
          } break;
          case 'ShipDate': {
            let date = ExcelDateToJSDate(item[key]);
            shipDate.push(date);
            ShipDate['value'] = shipDate;
            ShipDate['category'] = "wip";
            ShipDate['name'] = 'ShipDate';
            setShipDate(ShipDate);
          } break;
          case 'AccountNumber': {
            accountNumber.push(item[key]);
            AccountNumber['value'] = accountNumber;
            AccountNumber['category'] = "wip";
            AccountNumber['name'] = 'AccountNumber';
            setAccountNumber(AccountNumber);
          } break;
          case 'ProductID': {
            productID.push(item[key]);
            ProductID['value'] = productID;
            ProductID['category'] = "wip";
            ProductID['name'] = 'ProductID';
            setProductID(ProductID);
          } break;
          case 'Name': {
            name.push(item[key]);
            Name['value'] = name;
            Name['category'] = "wip";
            Name['name'] = 'Name';
            setName(Name);
          } break;
          case 'Product_SUBCategory': {
            product_SUBCategory.push(item[key]);
            Product_SUBCategory['value'] = product_SUBCategory;
            Product_SUBCategory['category'] = "wip";
            Product_SUBCategory['name'] = 'Product_SUBCategory';
            setProduct_SUBCategory(Product_SUBCategory);
          } break;
          case 'ListPrice': {
            listPrice.push(item[key]);
            ListPrice['value'] = listPrice;
            ListPrice['category'] = "wip";
            ListPrice['name'] = 'ListPrice';
            setListPrice(ListPrice);
          } break;
          case 'UnitPrice': {
            let unitprice = ExcelDateToJSDate(item[key]);
            unitPrice.push(unitprice);
            UnitPrice['value'] = unitPrice;
            UnitPrice['category'] = "wip";
            UnitPrice['name'] = 'UnitPrice';
            setUnitPrice(UnitPrice);
          } break;
          case 'OrderQty': {
            orderQty.push(item[key]);
            OrderQty['value'] = orderQty;
            OrderQty['category'] = "wip";
            OrderQty['name'] = 'OrderQty';
            setOrderQty(OrderQty);
          } break;
          case 'StandardCost': {
            standardCost.push(item[key]);
            StandardCost['value'] = standardCost;
            StandardCost['category'] = "wip";
            StandardCost['name'] = 'StandardCost';
            setStandardCost(StandardCost);
          } break;
        }
      }
    }

    
    let DataItems = [SalesOrderID, Orderdate, ShipDate, AccountNumber, ProductID, Name, Product_SUBCategory, ListPrice, UnitPrice, OrderQty, StandardCost ]

    for (let key in items[0]) {
      let keyobject = {};
      keyobject['Header'] = key;
      keyobject['accessor'] = key;
      keyobject['category'] = "wip";
      keyobject['name'] = key
      coloumnNames.push(keyobject);

      setColoumnNames(coloumnNames);
    }

    for (let item of items) {
      for (let key in item) {
        switch (key) {
          case 'OrderDate': {
            let date = ExcelDateToJSDate(item[key]);
            item[key] = date;
          } break;
          case 'ShipDate': {
            let date = ExcelDateToJSDate(item[key]);
            item[key] = date;
          } break;
          case 'UnitPrice': {
            let unitprice = ExcelDateToJSDate(item[key]);
            item[key] = unitprice
          } break;
        }
      }
    }

    setDataItems(DataItems);


  };

  const contentClicked = (name) => {
    setContent(name);
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />      

      <div className={"charts"+ (content === 'TABLE' ? ' active' : '')}
       onClick={() => contentClicked('TABLE')}><img src={TABLE}/>
       <div className ='table'>TABLE</div></div>

      <div className={"charts"+ (content === 'BAR' ? ' active' : '')}
       onClick={() => contentClicked('BAR')}><img src={BAR}/>BAR</div>

      <div className={"charts"+ (content === 'LINE' ? ' active' : '')}
       onClick={() => contentClicked('LINE')}><img src={LINE}/>LINE</div>

      <div className={"charts"+ (content === 'PIE' ? ' active' : '')}
       onClick={() => contentClicked('PIE')}><img src={PIE}/>PIE</div>

      {content === 'BAR' && <ChartsDraggablecomponents excelitems={DataItems} content={content}/>}
      {content === 'LINE' && <ChartsDraggablecomponents excelitems={DataItems} content={content}/>}
      {content === 'PIE' && <ChartsDraggablecomponents excelitems={DataItems} content={content}/>}
      {content === 'TABLE' && <Draggablecomponents excelitems={DataItems} coloumnNames={coloumnNames}
       Items={Items}/>}
    </div>
  );
}

export default App;
