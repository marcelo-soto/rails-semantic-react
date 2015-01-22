/** @jsx React.DOM */
/*
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
*/

var RowList = React.createClass({
  handleToggle: function(el){
  	el.esta_activo = !el.esta_activo;
    this.props.onToggleClick(el);
  },
  componentDidUpdate: function(){
    $('.ui.checkbox').checkbox();
  },
  render: function(){
    var rows = [];
    var that = this;
    var filterField = this.props.filterField;
    this.props.data.forEach(function(rw){
      if(rw[filterField.field] === that.props.filter.filter || that.props.filter.filter === "*"){
        var r = that.props.fields.map(function(f){
          return(<td key={f.field} width={f.width}>{ rw[f.field] }</td>)
        });
        var tr_classes = React.addons.classSet({'negative': !rw.esta_activo});
        rows.push(<tr key={rw.id} className={tr_classes}>{r}<td className="collapsing"><div className="ui fitted toggle checkbox" onClick={this.handleToggle.bind(null, rw)}><input type="checkbox" checked={rw.esta_activo} /><label></label></div></td></tr>);
      }
    }.bind(this));
    return (<tbody>{rows}</tbody>);
  }
});

var BodyTable = React.createClass({
  onToggleClick: function(el){
    this.props.onToggleClick(el);
  },
  render: function() {
    var header = this.props.fields.map(function(field){
      return(<th key={field.label}>{ field.label }</th>)
    });
    return (
    <table className="ui compact table">
      <thead>
        <tr>{header}<th>Activo</th></tr>
      </thead>
      <RowList data={this.props.data} filter={this.props.filter} fields={this.props.fields} filterField={this.props.filterField} onToggleClick={this.onToggleClick}/>
    </table>
    )
  }
});

var DataTable = React.createClass({
  loadData: function(){
    $.ajax({
      url: this.props.url + this.props.resource + ".json",
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
  handleDataToggle: function(data_id, value){
  	console.log(value);
  	var method;
  	if (value){
  		method = "/set_active";
  	} else {
  		method = "/set_inactive";
  	}
    $.ajax({
      url: this.props.url + this.props.resource + "/" + data_id + method,
      dataType: "json",
      type: "PUT",
      success: function(data){
      	if(data.status === 'ok'){
			    for (var i = 0; i < this.state.data.length; i++) {
			      if(this.state.data[i].id === data_id)
			        this.state.data[i].esta_activo = value;
			    }
			    //this.forceUpdate(); 
			  }
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  handleFilterClick: function(filter){
    this.setState({filter: filter})
  },
  toggleActive: function(el){
    this.handleDataToggle(el.id, el.esta_activo);
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
    this.loadData();
  },
  render: function(){
    return(
      <div>
        <BodyTable data={this.state.data} filter={this.state.filter} fields={this.props.fields} filterField={this.props.filterField} onToggleClick={this.toggleActive} />
      </div>
      )
  }
})

//<DataFilter onFilterClick={this.handleFilterClick} filters={this.state.filters} filter={this.state.filter} filterField={this.props.filterField}/>
//var filterField = {field: "factor", name: "Factor"};
//var fields = [{field: "codigo", label: "Código", width: 100}, {field: "descripcion", label: "Descripción", width: 400}, {field: "nivel", label: "Nivel"}, {field: "subnivel", label: "Sub Nivel"}, {field: "factor", label: "Factor"}, {field: "valor_minimo", label: "Valor Minimo"}, {field: "valor_maximo", label: "Valor Maximo"}];
//React.renderComponent(<dataTable url="/api/v1/indicadores.json" fields={fields} filterField={filterField} />, document.getElementById('indicadores_show'));
