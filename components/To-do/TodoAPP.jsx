import React ,{Component} from 'react'
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import HelloWorldService from '../../api/todo/HelloWorldService.js'
import TodoDataService from '../../api/todo/TodoDataService.js'
import moment from 'moment'





class TodoApp extends Component {
   

    render(){
    return(
        <div className="Todo"> 
            

        <Router>
        
            <>
            <HeaderComponent/>
            <Switch>
            
            <Route path="/" exact component={LoginComp}></Route>
                <Route path="/login"  component={LoginComp}></Route>
                <AuthenticatedRoute path="/welcome/:name" component={WelcomeComp}/>
                <AuthenticatedRoute path="/todos/:id" component={TodosComponent}/>
                  {/* higher priority */}
                <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
               
                <AuthenticatedRoute path="/logout" component={LogoutComp}/>
                <Route component={ErrorComponent}></Route>
              
            </Switch>
            <FooterComponent/>
            </>
            
        </Router>
        
        </div>
    );

    }
}

class TodosComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
            id:this.props.match.params.id,
            description: '',
            targetDate:moment(new Date()).format('YYYY-MM-DD')
        }

        this.handleChange=this.handleChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    componentDidMount(){

        let username= AuthenticationService.getLoggedInUserName()

        

        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response=>this.setState({
            description: response.data.description,
            targetDate:  moment(response.data.targetDate).format('YYYY-MM-DD'),
        }))
    }
    
    handleChange(event){
        console.log(this.state)
        this.setState({
           
            [event.target.name]: event.target.value
        })
     }

     onSubmit(){
        let username= AuthenticationService.getLoggedInUserName()
        if(this.state.id=== -1){
            TodoDataService.createTodo(username ,
                {id:this.state.id,
                username:username,
                description:this.state.description,
                targetDate:this.state.targetDate
                })

                this.props.history.push('/todos')
        }else{
            TodoDataService.updateTodo(username,this.state.id,
                {id:this.state.id,
                username:username,
                description:this.state.description,
                targetDate:this.state.targetDate
                })

                this.props.history.push('/todos')
        }
     }

    render(){
        
        return(
        <div>
            
            <h1>Todo Component</h1>
            <div>

               
                            
               
                                 Description:<input type="text" maxLength="1000" value={this.state.description} name="description" onChange={this.handleChange} /><br/><br/>
                                Target Date:<input type="date" maxLength="1000" value={this.state.targetDate} name="targetDate" onChange={this.handleChange} /><br/>
                                <input type="submit" maxLength="1000"  value="Save" onClick={this.onSubmit}/>

                            
                      
            </div>
        

        </div>
        );
    }
}

class WelcomeComp extends Component{
    constructor(props){
        super(props)
            this.retrieveWelcomeMessage=this.retrieveWelcomeMessage.bind(this)
            this.handleSuccessfulResponse=this.handleSuccessfulResponse.bind(this)
            this.handleSuccessfulResponseBean=this.handleSuccessfulResponseBean.bind(this)
            this.handleSuccessfulResponsePathVariable=this.handleSuccessfulResponsePathVariable.bind(this)
            this.handleError=this.handleError.bind(this)
            this.state={
                WelcomeMessage: '',
                BeanMessage :'',
                PathVariableMessage: '',
                ErrorMessage: ''
            }
        
    }
    retrieveWelcomeMessage(){
       HelloWorldService.executeHelloWorldService()
       .then(response =>this.handleSuccessfulResponse(response))

       HelloWorldService.executeHelloWorldBeanService()
       .then(response =>this.handleSuccessfulResponseBean(response))
    
       HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
       .then(response =>this.handleSuccessfulResponsePathVariable(response))
       .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){
        this.setState({
            WelcomeMessage: response.data
        })
    }

    handleSuccessfulResponseBean(response){
        
        this.setState({
            BeanMessage: response.data.message
        })
    }
    handleSuccessfulResponsePathVariable(response){
        
        this.setState({
            PathVariableMessage: response.data.message
        })
    }


    handleError(error){
        console.log(error.response)
        this.setState({
           ErrorMessage: error.response.data.message
        })
    }
    render(){

        return( 
            <>
            <div>Welcome {this.props.match.params.name}. You can manager your todos  <Link to="/todos">here</Link></div>
            
            <div>Click here to get custom message . <input type="button" value="Click Me" onClick={this.retrieveWelcomeMessage}/></div>
            <div>{this.state.WelcomeMessage} </div>
            <div>{this.state.BeanMessage} </div>
            <div>{this.state.PathVariableMessage} </div>
            </>
            );
    }
}


function ErrorComponent(){
    return <div>Error occured..wrong URL</div>

}

class HeaderComponent extends  Component{

    
      
    

    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()

        
        console.log(isUserLoggedIn);

        return(

            <header> 
                <nav className="navbar navbar-expand-md navbar-dark bg-dark-gray">
                        <div><a>Life Deeds</a></div>
                        <ul className="navbar-nav">
        {isUserLoggedIn && <li className="nav-link"><Link to="/login">Home</Link></li> }
        { isUserLoggedIn &&  <li className="nav-link"><Link to="/todos">Todos</Link></li> }
                        </ul>
                        <ul className="navbar-nav">
                            {!isUserLoggedIn && <li className="nav-link"><Link to="/login" >Login</Link></li>}
                            {isUserLoggedIn && <li className="nav-link"><Link to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ul>
                        
                </nav>

            </header>
        );
    }
}
class FooterComponent extends  Component{

    
    render(){
        const { classes } = this.props;
            return(

            <div>
               <hr/> 
                Footer
               
            </div>
        );
    }
}

class LogoutComp extends Component{

    constructor(props){
        super(props)
        

    }

   

    render()
    
    {
        
        return (
        <div >You are logged out . Thanks Visit Again</div>
              
            );
        
       
    }
    
}
class ListTodosComponent extends Component{

    constructor(props){

        super(props)
        this.state={
            todos:[ ],
            message: null
        }

       this.deleteTodoClicked=this.deleteTodoClicked.bind(this);
       this.updateTodoClicked = this.updateTodoClicked.bind(this);
       this.addTodoClicked=this.addTodoClicked.bind(this);
       this.refreshTodos=this.refreshTodos.bind(this);

    }
    componentDidMount(){
      
        this.refreshTodos()
    } 

    refreshTodos(){
        let username=AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response =>{
                console.log(response)
                this.setState({todos: response.data})
            }
        )
    }
    deleteTodoClicked(id){
        let username=AuthenticationService.getLoggedInUserName()
       // console.log(id + username)
        TodoDataService.deleteTodo(username,id)
        .then(response => {
            this.setState({
                message:`Delete of todo ${id} Successful`
            });
            this.refreshTodos()
        })
       
    }
    updateTodoClicked(id){
        console.log(id)
        this.props.history.push(`/todos/${id}`)
    //     let username=AuthenticationService.getLoggedInUserName()
    //    // console.log(id + username)
    //     TodoDataService.deleteTodo(username,id)
    //     .then(response => {
    //         this.setState({
    //             message:`Delete of todo ${id} Successful`
    //         });
    //         this.refreshTodos()
    //     })
       
    }

    addTodoClicked(){
            
            this.props.history.push('/todos/-1')
    }

    render(){
        return(
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div>{this.state.message}</div> }
                <table>
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>Target Date</th>
                        <th>is Completed</th>
                        <th>Update</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.todos.map( todo =>
                        <tr key={todo.id}>  
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>                            
                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                            <td>{todo.done.toString()}</td>
                            <td><button onClick={()=>this.updateTodoClicked(todo.id)}>Update</button></td>
                            <td><button onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                            
                        </tr>
                        )
                    }
                    </tbody>
                </table>
                <div>
                    <button onClick={this.addTodoClicked}>Add Todo</button>
                </div>
            </div>
        );
    }
}
class LoginComp extends Component
{
    constructor(props){
        super(props)
        this.state={

            username:'Shreyas',
            password: '12345',
            showsuccessmessage:false,
            hasloginfailed:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.loginClicked=this.loginClicked.bind(this)
    }

    handleChange(event){
        console.log(this.state)
        this.setState({
           
            [event.target.name]: event.target.value
        })
     }

     loginClicked(){
         if(this.state.username==='Shreyas' && this.state.password==='12345'){
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);           
            this.props.history.push(`/welcome/${this.state.username}`)
            window.location.reload();
           
         }
         else{
            this.setState({
                showsuccessmessage:false,
                hasloginfailed:true
            })
         }
     }
    
render(){
    return (

        <div className="login">
            {this.state.hasloginfailed && <div>Invalid Credentials</div> }
            {this.state.showsuccessmessage && <div>Successful</div> }
            
            Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/><br/>
            Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /><br/>
            <button onClick={this.loginClicked}>Login</button>
        </div>
    );
    }
}

  

export default TodoApp;