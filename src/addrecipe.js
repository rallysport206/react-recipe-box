import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

// class for displaying the modal for adding a new recipe and export it.
export class AddRecipe extends React.Component {
    constructor(props){
        this.state = {name: "", ingredients: ""};
        this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
        this.handleRecipeIngredientsChange = this.handleRecipeIngredientsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleRecipeNameChange(e) {
        this.setState({name:e.target.value});
    }
    handleRecipeIngredientsChange(e) {
        this.setState({ingredients:e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        const onAdd = this.props.onAdd;
        const regExp = /\s*, \s*/;
        var newName = this.state.name;
        var nawIngredients = this.state.ingredients.split(regExp);
        var newRecipe = {name: newName, ingredients: newIngredients};
        onAdd(newRecipe);
        
    }
}