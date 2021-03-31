import React from "react";
import axios from "axios";
import "./Addproductutest.css";
import "./ProductDetails.css";

export default class Addproducttest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopname: "",
      shopaddress: "",
      productcostprice: "",
      productsellingprice: "",
      productcategory: "",
      myproducts: [{ _id: 1, productname: "loading" }],
      todos:[],
        product_details:[]
    };
   
    
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  
 
 
  onChangeInput(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  }
  handleSubmit6(e) {
    e.preventDefault();
    const shopname = this.state.shopname;

   

  

    var data = new URLSearchParams();

   

    for (const pair of new FormData(e.target)) {
    
      data.append(pair[0], pair[1]);
    }
   
    fetch("http://localhost:5000/addPro", {
      method: "post",
      body: data,
      shopname: this.state.shopname,
      _id: this.state._id,
    })
      .then((res) => res.json())
      .then((res2) => {
        this.setState({
          myproducts: [...this.state.myproducts, res2],

        });
        fetch('http://localhost:5000/getShops')

  
        .then(res=>res.json())
        .then(res2=>{
         
          console.log("fvvvvv"+JSON.stringify(res2))
         
          this.setState({
            todos:res2,
            product_details:[]
          })
        })
      });
      
    alert("Product added successfully");
    // window.location.reload();
  }
  componentDidMount() {
    
    fetch('http://localhost:5000/getShops')

  
    .then(res=>res.json())
    .then(res2=>{
     
      console.log("fvvvvv"+JSON.stringify(res2))
     
      this.setState({
        todos:res2,
        product_details:[]
      })
    })
    
  }
  selectProducts(e){
   
     this.setState({product_details:e.product_details})
    
   }
   moveProductDetail = () => {
    this.props.history.push("/shopdetails");
  };
  render() {
    return (
      <div class="container" id="addproductcontainer">
        <div class="form" id="addproductform">
          <div class="note">
            <p id="titleshopname">Shop Name:{this.props.location.state.list.shopname}</p>
          </div>

          <form onSubmit={(e) => this.handleSubmit6(e)}>
            <div>
             
            </div>
            <input
              type="hidden"
              name="_id"
              value={this.props.location.state.list._id}
              onChange={(e) => this.setState({ _id: this.props.location.state.list._id })}
              
            />
            <input
              type="hidden"
              name="shopname"
              placeholder="Shop Name"
              value={this.props.location.state.list.shopname}
              onChange={(e) => this.setState({ shopname: e.target.value })}
            />
            <div class="form-group">
              <input
                type="text"
                name="productname"
                placeholder="Product Name"
                value={this.state.productname}
                onChange={(e) => this.setState({ productname: e.target.value })}
              />
            </div>
            <input
              type="text"
              name="productcostprice"
              placeholder="Cost Price"
              value={this.state.productcostprice}
              onChange={(e) =>
                this.setState({ productcostprice: e.target.value })
              }
            />
            <input
              type="text"
              name="productsellingprice"
              placeholder="Selling Price"
              value={this.state.productsellingprice}
              onChange={(e) =>
                this.setState({ productsellingprice: e.target.value })
              }
            />
            <input
              type="text"
              name="productcategory"
              placeholder="Category"
              value={this.state.productcategory}
              onChange={(e) =>
                this.setState({ productcategory: e.target.value })
              }
            />

            <button
              type="submit"
              className="waves-effect waves-light btn"
              id="btnaddprdct"
            >
              <p id="addtextbtn">Add</p>
            </button>
            

            <button 
              style={{}}
              type="submit"
              className="waves-effect waves-light btn"
              id="btnback"
              onClick={this.moveProductDetail}
            >
              <p id="backtextbtn">back</p>
            </button>

          </form>
        </div>



        <div style={{}} className="container">
       
       <h1 id="titleproductdetails" className="prodethead">Product Details</h1>
      
         
      <div className="col-md-6">
   
     
  

    
         
         {this.state.todos.filter(todos => todos._id === this.props.location.state.list._id)
            .map(todos =>(
   
        <div>
          
<div id="shopcardproduct" className="card shopcard">

          <div className="card-body">
          <p id="shopnametitle" onClick={() => this.selectProducts(todos)} className="card-title">Shop_Name: {todos.shopname}</p>
       
            <h6 className="card-subtitle mb-2 text-muted">
            { todos.completed &&
              <span>
              Completed
              </span>
            }
           
            </h6>
          </div>
        </div>
        </div>
       
      ))}
      </div>



      <div id="productlisttable" style={{color:"black"}} className="col-md-6">
      <div class="container">

      {this.state.product_details.map(item => (


        <table id="protable" class="table table-bordered">
  <thead>
    <tr>
        
      <th id="pdname">Name</th>
      <th id="pdname">Cost_Price</th>
      <th id="pdname">Category</th>
      <th id="pdname">Selling_Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="pdnametd">{item.productname}</td>
      <td id="pdnametd">{item.productcostprice}</td>
      <td id="pdnametd">{item.productcategory}</td>
      <td id="pdnametd">{item.productsellingprice}</td>
      
    </tr>
  
  </tbody>
</table>
      ))}

</div>

      </div>





     </div>

      </div>
    );
  }
}
