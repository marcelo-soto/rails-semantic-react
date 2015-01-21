/** @jsx React.DOM */
var DataFilter = React.createClass({
handleClick: function(filter){
	this.props.onFilterClick({filter: filter});
},
	render: function(){
		var filters = this.props.filters.map(function(link){
			var classes = React.addons.classSet({
		    'button': true,
		    'tiny': true,
		    'success': (this.props.filter.filter === link)
		});
			return(
				<li key={link}><input type="button" ref="filterButton" className={classes} onClick={this.handleClick.bind(null, link)} value={link} /></li>
			)	
		}.bind(this));
		return(<div><h3 className="subheader">{this.props.filterField.name}</h3><ul className="button-group">{filters}</ul></div>)
	}
});

var RowList = React.createClass({
	render: function(){
		var rows = [];
		var that = this;
		var filterField = this.props.filterField;
		this.props.data.forEach(function(rw){
			if(rw[filterField.field] === that.props.filter.filter || that.props.filter.filter === "*"){
				var r = that.props.fields.map(function(f){
					return(<td width={f.width}>{ rw[f.field] }</td>)
				});
				rows.push(<tr key={rw.id}>{r}</tr>)
			}
		});
		return (<tbody>{rows}</tbody>);
	}
});

var BodyTable = React.createClass({
	render: function() {
		var header = this.props.fields.map(function(field){
			return(<th>{ field.label }</th>)
		});
		return (
		<table className="ui compact table">
		  <thead>
		    <tr>{header}</tr>
		  </thead>
		  <RowList data={this.props.data} filter={this.props.filter} fields={this.props.fields} filterField={this.props.filterField}/>
		</table>
		)
	}
});

var DataTable = React.createClass({
	handleFilterClick: function(filter){
		this.setState({filter: filter})
	},
	getInitialState: function(){
		return {
			data: [{}],
			filter: {filter: "*"},
			filters: ['*'],
			filterField: {field: "id", name: "ID"}
		};
	},
	componentWillMount: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data){
				var filters = [];
				var field = this.props.filterField.field;
				data.forEach(function(f){
					filters.push(f[field]);
				});
				var filters_ = _.uniq(filters).sort(); 
				filters_.unshift('*');
				this.setState({filters: filters_, data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		})
	},
	render: function(){
		return(
			<div>
  			
  			<BodyTable data={this.state.data} filter={this.state.filter} fields={this.props.fields} filterField={this.props.filterField}/>
  		</div>
			)
	}
})

//<DataFilter onFilterClick={this.handleFilterClick} filters={this.state.filters} filter={this.state.filter} filterField={this.props.filterField}/>
//var filterField = {field: "factor", name: "Factor"};
//var fields = [{field: "codigo", label: "Código", width: 100}, {field: "descripcion", label: "Descripción", width: 400}, {field: "nivel", label: "Nivel"}, {field: "subnivel", label: "Sub Nivel"}, {field: "factor", label: "Factor"}, {field: "valor_minimo", label: "Valor Minimo"}, {field: "valor_maximo", label: "Valor Maximo"}];
//React.renderComponent(<dataTable url="/api/v1/indicadores.json" fields={fields} filterField={filterField} />, document.getElementById('indicadores_show'));
