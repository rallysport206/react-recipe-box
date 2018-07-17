import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

export class EditRecipe extends React.Component {
    constructor(props) { //creating a state to handle the recipe to be edited
        super(props);
        this.state = {name: "", ingredients: ""};
        this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
        this.handleIngredientsChange = this.handleRecipeIngredientsChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    static getDerivedStateFromProps(props, state) {//make recipe prop a state
        const prevName = state.prevName;
        const prevIngredients = state.prevIngredients;
        const name = prevName !== props.recipe.name ? props.recipe.name: state.name;
        const ingredients = prevIngredients !== props.recipe.ingredients.join(",") ? props.recipe.ingredients.join(",") : state.ingredients;
        return{
            prevName: props.recipe.name, name,
            prevIngredients: props.recipe.ingredients.join(","),ingredients,
        }
    }
    handleRecipeNameChange(e) { //change the name to reflect the users input
        this.setState({name: e.target.value});
    }
    handleRecipeIngredientsChange(e) { // change the ingredients to reflect ueser inpurt
        this.setState({ingredients: e.target.value});
    }
    handleEdit(e) { //get the data recipe, manipulate it and call function for editing an existing recipe
        e.preventDefault();
        const onEdit = this.props.onEdit;
        const currentlyEditing = this.props.currentlyEditing;
        const regExp = /\s*, \s*/;
        var name = this.state.name;
        var ingredients = this.state.ingredients.split(regExp);
        onEdit(name, ingredients, currentlyEditing);
    }
    handleCancel() {
        const onEditModal = this.props.onEditModal;
        this.setState({name: this.props.recipe.name, ingredients: this.props.recipe.ingredients.join(",")});
        onEditModal();
    }
    Render() {
        const onShow = this.props.onShow;
        var regex1 = /^\S/;
        var regex2 = /^[^,\s]/;
        var regex3 = /[^,\s]$/;
        const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);
            return(
                <Modal show={onShow} onHide={this.handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup controlId="formControlsName">
                            <ControlLabel>Recipe Name</ControlLabel>
                            <FormControl type="text" required onChange={this.handleRecipeNameChange} value={this.state.name} placeholder="Enter Name"/>
                        </FormGroup>
                        <FormGroup controlId="formControlsIngredients">
                            <ControlLabel>Recipe Ingredients</ControlLabel>
                            <FormControl componentClass="textarea" type="text" required onChange={this.handleRecipeIngredientsChange} value={this.state.ingredients} placeholder="Enter Ingredients (separate by commas)" />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={!validRecipe} bsStyle="success" onClick={this.handleEdit}>Save Recipe</Button>
                    </Modal.Footer>
                </Modal>
            )
    }
}