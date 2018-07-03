import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

export class EditRecipe extends React.Component {
    constructor(props) { //creating a state to handle the recipe to be edited
        super(props);
        this.state = {name: "", ingredients: ""};
        this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
}