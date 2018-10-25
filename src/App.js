import React, { Component } from 'react';
import './App.css';
import { Table,Input,Button,Modal,Select } from 'antd';

const Option = Select.Option;

class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
      listoredit:"list",
      currentindex:1,
      newroomname:'',
      newroomprice:'',
      choosedindex:1,
      choosedname:'',
      choosedprice:'',
      visible:false,
      isnewproperty:false,
      newpropertyname:'',
      columns:[{
        title: 'Room name',
        dataIndex: 'roomname',
        }, {
          title: 'Price(per week)',
          dataIndex: 'price',
        },{
          title: 'Action',
          key: 'action',
          render: (text, record,index) => (
            <span key={index} onClick={(e)=>this.editroom(text,record,index)}>
              edit
            </span>
          ),
      }],
      propertylist:[
        {
          pname:'property1',
          roomlist:[
            {key: '1',roomname:'room1',price:'$200'},
            {key: '2',roomname:'room1',price:'$200'},
            {key: '3',roomname:'room1',price:'$200'},
          ]
        },
        {
          pname:'property2',
          roomlist:[
            {key: '1',roomname:'room2',price:'$200'},
            {key: '2',roomname:'room2',price:'$200'},
            {key: '3',roomname:'room2',price:'$200'},
          ]
        },
      ]
		};
  }
  tabmenu(params) {
    console.log(params)
    this.setState({
      listoredit:params,
      
    })
  }
  newroom(){
    let roomlist=this.state.propertylist[this.state.currentindex].roomlist;
    roomlist.push({key:roomlist.length+1,roomname:this.state.newroomname,price:this.state.newroomprice})
    this.setState({
      propertylist:this.state.propertylist,
      newroomname:'',
      newroomprice:'',
    })
  }
  editroom(text,record,index){
    this.setState({
      visible: true,
      choosedindex:index,
      choosedname:text.roomname,
      choosedprice:text.price,
    });
  }
  handleOk (e){
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  Saveeditroom(){
    let roomlist=this.state.propertylist[this.state.currentindex].roomlist;
    roomlist[this.state.choosedindex].roomname=this.state.choosedname;
    roomlist[this.state.choosedindex].price=this.state.choosedprice;
    this.setState({
      propertylist:this.state.propertylist,
      visible: false,
    });
  }

  deleteeditroom(){
    let roomlist=this.state.propertylist[this.state.currentindex].roomlist;
    roomlist.splice(this.state.choosedindex,1)
    this.setState({
      propertylist:this.state.propertylist,
      visible: false,
    });
  }
  tabproperty(index){
    this.setState({
      currentindex:index,
      isnewproperty:false,
    })
  }
  newproperty(){
    this.setState({
      isnewproperty:true
    })
  }
  savenewroom(){
    this.state.propertylist.push({
      pname:this.state.newpropertyname,
      roomlist:[]
    })
    this.setState({
      propertylist:this.state.propertylist,
      newpropertyname:''
    })
  }
  cancelnewroom(){
    this.setState({
      isnewproperty:false,
    })
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  render() {
    return (
      <div className="App">
        <header>STUDENT.COM</header>
        <div className="container">
          <div className="sidemenu">
            <div className={this.state.listoredit==="list"?"menuitem active":"menuitem"} onClick={()=>this.tabmenu("list")}> 
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><rect stroke="#000" strokeWidth="1.5" x=".75" y=".75" width="18.5" height="18.5" rx="1.429"/><rect fill="#000" x="5.714" y="5.714" width="8.571" height="1.429" rx=".714"/><rect fill="#000" x="5.714" y="9.286" width="8.571" height="1.429" rx=".714"/><rect fill="#000" x="5.714" y="12.857" width="8.571" height="1.429" rx=".714"/></g></svg>
            List
            </div>
            <div className={this.state.listoredit==="edit"?"menuitem active":"menuitem"} onClick={()=>this.tabmenu("edit")}> 
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><rect stroke="#000" strokeWidth="1.5" x=".75" y=".75" width="18.5" height="18.5" rx="1.429"/><rect fill="#000" x="5.714" y="5.714" width="8.571" height="1.429" rx=".714"/><rect fill="#000" x="5.714" y="9.286" width="8.571" height="1.429" rx=".714"/><rect fill="#000" x="5.714" y="12.857" width="8.571" height="1.429" rx=".714"/></g></svg>
            Edit
            </div>
          </div>
          <div className="content">
          {
            this.state.listoredit==='list'
            ?<div><div className="pad20">
            <h2>Property List</h2>
            {
              this.state.propertylist ? this.state.propertylist.map((item, index) => {
                return <div key={index} className="pitem pad20">
                  <h3>{item.pname}</h3>
                  <div>
                    <div className="thead"> 
                      <div>Room name</div>
                      <div>Price(per week)</div>
                      <div>Room name</div>
                      <div>Price(per week)</div>
                    </div>
                    <div className="roomlist" style={{height:50*parseInt((item.roomlist.length+1)/2)+'px' }}>
                      {
                        item.roomlist.map((roomitem,roomindex)=>{
                          return <div key={roomindex} className="roomitem">
                            <div>{roomitem.roomname}</div>
                            <div>{roomitem.price}</div>
                          </div>
                        })
                      }
                    </div>
                  </div>

                </div>
              }
              ) : ''
            }
          </div>
       </div>
            :<div><div className="pad20">
            <h2>Edit Properties
              <Button className="" onClick={()=>this.newproperty()}>Add new property</Button>
            </h2>
            <div className="flex">
              <div>
              {
                this.state.propertylist ? this.state.propertylist.map((item, index) => {
                  return <div key={index} className={this.state.currentindex===index?'activeproperty':''} onClick={()=>this.tabproperty(index)}>
                    {item.pname}
                  </div>
                }
                ) : ''
              }
              </div>
              {

                this.state.isnewproperty?<div>
                    <h3>Property name</h3>
                    <Input placeholder="" value={this.state.newpropertyname} onChange={e => this.setState({ newpropertyname: e.target.value })}/>

                    {/* <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select> */}
                    {/* <h3>Price</h3>
                  <div className="bg">
                    <div>
                      <Input placeholder="Room name" value={this.state.newroomname} onChange={e => this.setState({ newroomname: e.target.value })}/>
                      <Input placeholder="Price" value={this.state.newroomprice} onChange={e => this.setState({ newroomprice: e.target.value })}/>
                    </div>
                    <Button onClick={()=>this.newroom()}>Add</Button>
                  </div> */}

                    <Button onClick={()=>this.savenewroom()}>Save</Button>

                    <Button onClick={()=>this.cancelnewroom()}>Cancel</Button>
                </div>:
                <div>
                  <h3>Price</h3>
                  <Table columns={this.state.columns} dataSource={this.state.propertylist[this.state.currentindex].roomlist} pagination="false" />
                  
                  <div className="bg">
                    <div>
                      <Input placeholder="Room name" value={this.state.newroomname} onChange={e => this.setState({ newroomname: e.target.value })}/>
                      <Input placeholder="Price" value={this.state.newroomprice} onChange={e => this.setState({ newroomprice: e.target.value })}/>
                    </div>
                    <Button onClick={()=>this.newroom()}>Add</Button>
                  </div>
                </div>
              }
            </div>
          </div>
          <Modal title="Edit Room"
            visible={this.state.visible}
            onOk={()=>this.handleOk()}
            onCancel={()=>this.handleCancel()}
            footer={[
              <Button key="back" onClick={()=>this.Saveeditroom()}>Save</Button>,
              <Button key="submit" type="primary"  onClick={()=>this.deleteeditroom()}> Delete   </Button>, ]}>
            <h3>Room name</h3>
            <Input placeholder="Room name" value={this.state.choosedname} onChange={e => this.setState({ choosedname: e.target.value })}/>
                      
            <h3>Price</h3>
            <Input placeholder="Price" value={this.state.choosedprice} onChange={e => this.setState({ choosedprice: e.target.value })}/>      
          </Modal>
           </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
