var React = require('react'); 
var ReactDOM = require('react-dom');

var LefternRowItem = React.createClass({
	render: function() {
		var className = "col-md-4";
		if (this.props.well=="true"){
			className = "well col-md-4"; 	
		}
		return(
			<div className="row lefternRowItem">
                <div className="col-md-1"/>
                <div className={ className }>
                	{this.props.children}
                </div>
                <div className="col-md-7"/>
        	</div>
		); 
	}
});

var PageHeading = React.createClass({
	render: function(){
		return(
            <div className="row pageHeading">
                <div className="col-lg-12">
                    <h1 className="page-header">{this.props.pageName}</h1>
                </div>
            </div>
		); 
	}
});

var Footer = React.createClass({
	render: function(){
		return(
            <footer className="footer">
                <div className="row">
                    <div className="col-lg-12">
                        <p>Copyright &copy; Your Website 2014</p>
                    </div>
                </div>
            </footer>		
        ); 
	}
});

var ShowModalButton = React.createClass({
	showModal: function(){
		$("#" + this.props.modalId ).modal('show');
	},
	render: function(){
		return(
        	<LefternRowItem well="false">
				<div className="row">
					<div className="col-md-5"/>
					<div className="col-md-2">
						<button type="button" className="btn btn-default btn-sm" onClick={this.showModal}>
							{this.props.children}
						</button>						
						<br/>
						<br/>
					</div>
					<div className="col-md-5"/>
				</div>
			</LefternRowItem>				
		); 	
	}
});

var StageModal = React.createClass({
	getInitialState: function() {
		return this.props.initialData();
	},
	handleNameChange: function(e) {
	    this.setState({ name: e.target.value });        
	},	
	handleDetailsChange: function(e) {
	    this.setState({ details: e.target.value });        
	},
	handleDescriptionChange: function(e) {
	    this.setState({ description: e.target.value });        
	},	
	handleSubmit: function(){
		var newStage = {
			"name" : this.state.name,
			"details" : this.state.details, 
			"description" : this.state.description
		};
		this.props.handleSubmit(this.props.index,newStage);
	},	
	render: function(){
		return(
			<div>
				<ShowModalButton modalId={this.props.modalId}>
					{this.props.children}
				</ShowModalButton>
				<div className="container">
					<div className="modal fade" id={this.props.modalId} role="dialog" >
						<div className="modal-dialog">

							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal">&times;</button>
									<h4 className="modal-title">{this.props.title}</h4>
								</div>

								<div className="modal-body">
									<div className="row" id={ "stageForm#" + this.props.index} >
										<div className="col-md-1"/>
										<div className="col-md-10">
								            <form >
												<input 
													className="form-control"
													type="text" 
													value={this.state.name} 
													placeholder="Stage Name"
													onChange={this.handleNameChange}/><br/><br/>
												<input 
													className="form-control"
													type="text" 
													value={this.state.details} 
													placeholder="Stage Details"
													onChange={this.handleDetailsChange}/><br/><br/>
												<input 
													className="form-control"
													type="text" 
													value={this.state.description} 
													placeholder="Stage Description"
													onChange={this.handleDescriptionChange}/><br/><br/>
												<div className="modal-footer">
													<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
													<input type="submit" className="btn btn-default" data-dismiss="modal" onClick={this.handleSubmit} value="Done"/>					
												</div>
								            </form>
								        </div>
										<div className="col-md-1"/>
									</div>										
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		); 	
	}
});

var NewStage = React.createClass({
	initialData: function(){
		return {
			"name" : "",
			"details" : "",
			"description" : "" 
		}
	},
	render: function() {
		return (
			<StageModal 
				initialData={this.initialData}
				modalId={"newStageModal" + this.props.index} 
				index={this.props.index} 
				title="Add New Stage" 
				handleSubmit={this.props.addNewStage} >	
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
			</StageModal>
		); 
	}
});

var EditStage = React.createClass({
	initialData: function(){
		return {
			"name" : this.props.name,
			"details" : this.props.details,
			"description" : this.props.description
		}
	},
	render: function() {
		return (
			<StageModal 
				name={this.props.name}
				details={this.props.details}
				description={this.props.description}
				initialData={this.initialData}
				modalId={"editStageModal" + this.props.index} 
				index={this.props.index} 
				title="Edit Stage" 
				handleSubmit={this.props.editStage}>	
				<span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
			</StageModal>
		); 
	}
});

var TabBar = React.createClass({
	render: function() {
	  return (
	    <div className="navbar navbar-inverse navbar-fixed-top tabbar" role="navigation">
	        <div className="container">
	            <div className="navbar-header">
	                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
	                    <span className="sr-only">Toggle navigation</span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                </button>
	                <a className="navbar-brand" href="#">Traxter</a>
	            </div>
	            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	                <ul className="nav navbar-nav">
	                    <li>
	                        <a href="#">Settings</a>
	                    </li>
	                    <li>
	                        <a href="#">Contact</a>
	                    </li>
	                </ul>
	            </div>
	        </div>
	    </div>                
	  );          
	}
});

var Stage = React.createClass({
	removeStage: function(){
		this.props.removeStage(this.props.index);	
	},
	editStage: function(index,newStage){
		this.props.editStage(this.props.index,newStage);
	},
	render: function(){
		return(
            <div className="row stage" data-toggle="collapse" data-target={"#stageMore" + this.props.index}>
            	<LefternRowItem well="true">
            		<div className="row">
            			<div className="col-md-5">
	                    	<h1>{this.props.name}</h1>
	                    </div>
            			<div className="col-md-4"/>
            			<div className="col-md-1">
							<EditStage 
								name={this.props.name}
								details={this.props.details}
								description={this.props.Description}
								index={this.props.index} 
								editStage={this.editStage}/>
						</div>

            			<div className="col-md-1">
            				<button type="button" className="btn btn-default btn-sm" onClick={this.removeStage}>
								<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
							</button>
						</div>
            			<div className="col-md-1"/>
					</div>

					<div className="container">
					  <div id={"stageMore" + this.props.index} className="collapse">
	                    <h4>{this.props.details}</h4>
	                    <p>{this.props.description}</p>
	                    <h2>Tasks</h2>

					  </div>
					</div>	
                </LefternRowItem>
            </div>
		); 
	}
});

var StageList = React.createClass({
	getInitialState: function(){
		var sampleStageList = [
			{
				"name" : "Stage 1",
				"details" : "here are some details",
				"description" : "description stuff should go here"
			},
			{
				"name" : "Stage 2",
				"details" : "here are some details",
				"description" : "description stuff should go here"
			},
			{
				"name" : "Stage 3",
				"details" : "here are some details",
				"description" : "description stuff should go here"
			},
			{
				"name" : "Stage 4",
				"details" : "here are some details",
				"description" : "description stuff should go here"
			}
		];
		return {stages: sampleStageList};
	},
	handleAddStage: function(stageIndex,stage){
		var stages = this.state.stages; 
		stages.splice(stageIndex, 0, stage);
	    this.setState({ stages: stages });        
	},
	addNewStage: function(index,newStage){
		var stages = this.state.stages; 
		stages.splice(index,0,newStage);
	    this.setState({ stages: stages });        
	},
	editStage: function(index,newStage){
		console.log(newStage);
		var stages = this.state.stages; 
		stages.splice(index,1,newStage);
	    this.setState({ stages: stages });        
	},
	removeStage: function(index){
		var stages = this.state.stages; 
		stages.splice(index,1);
	    this.setState({ stages: stages });        
	},
	render: function(){
		var stageNodes = this.state.stages.map(function(stage,index){
			return (
				<div>
					<Stage 
						name={stage.name} 
						details={stage.details}
						description={stage.description}
						index={index}
						removeStage={this.removeStage}
						editStage={this.editStage}/>	
					<NewStage index={index+1} addNewStage={this.addNewStage}/>
				</div>
			); 
		}.bind(this));
		return(
			<div>
				<NewStage index={0} addNewStage={this.addNewStage}/>
				<div className="stageList">
					{stageNodes}
				</div>
			</div>
        ); 
	}
});

var TemplateManagement = React.createClass({
	render: function() {
		return (
	        <div className="templateManagement">

	        	<PageHeading pageName="Template Management" />

	        	<StageList/>

	            <hr/>

	            <Footer/>

	        </div>
		); 
	}
});


var Main = React.createClass({
	getInitialState: function(){
		return {
			currentPage: "TemplateManagement"
			// currentPage: "test"
		}
	},
	render: function() {
		var currentPageHTML; 
		switch(this.state.currentPage) {
		    case "TemplateManagement":
		        currentPageHTML = <TemplateManagement/>
		        break;
		    case "test":
		        currentPageHTML = <p>Hello World</p>
		        break;
		    default:
		        currentPageHTML = <TemplateManagement/>
		}
		return (
			<div>
				<div>	
					<TabBar/>
				</div> 
				<div>
					{currentPageHTML}
				</div>
			</div>
		);
	}
});

ReactDOM.render(<Main />,document.getElementById('app'));