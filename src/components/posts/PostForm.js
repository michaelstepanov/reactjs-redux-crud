import React, { Component } from 'react';
import classnames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class PostForm extends Component {
    state = {
        id: this.props.post ? this.props.post.id : null,
        title: this.props.post ? this.props.post.title : '',
        body: this.props.post ? this.props.post.body : '',
        errors: {},
        loading: false
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.post) {
            this.setState({
                id: nextProps.post.id,
                title: nextProps.post.title,
                body: nextProps.post.body
            })
        }
    }

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Validation
        let errors = {};
        if (this.state.title === '') errors.title = "can't be empty";
        if (this.state.body === '') errors.body = "can't be empty";
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { id, title, body } = this.state;
            this.setState({loading: true});
            this.props.savePost({id, title, body})
                .catch((err) => {
                    let errors = {};
                    errors.global = `Error #${err.response.status} - ${err.response.statusText}`;
                    this.setState({ errors, loading: false });
                });
        }
    }

    render() {
        const form = <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <h1>{!!this.props.post ? 'Edit Post' : 'Create Post'}</h1>

                            <div className={classnames("row", {error: !!this.state.errors.title})}>
                                <div className="input-field col s12">
                                    <label htmlFor="title">Title</label>
                                    <input id="title"
                                        name="title"
                                        type="text"
                                        placeholder=""
                                        className={classnames("validate", {invalid: !!this.state.errors.title})}
                                        data-error="wrong"
                                        data-success="right"
                                        value={this.state.title}
                                        onChange={this.handleChange}/>
                                    <div className="error-message">{this.state.errors.title}</div>
                                </div>
                            </div>

                            <div className={classnames("row", {error: !!this.state.errors.body})}>
                                <div className="input-field col s12">
                                    <label htmlFor="body">Body</label>
                                    <textarea id="body"
                                        name="body"
                                        type="text"
                                        placeholder=""
                                        className={classnames("materialize-textarea validate", {invalid: !!this.state.errors.body})}
                                        value={this.state.body}
                                        onChange={this.handleChange}/>
                                    <div className="error-message">{this.state.errors.body}</div>
                                </div>
                            </div>

                            <div className="row">
                                <button className="waves-effect waves-light btn">Save</button>
                                <a className="waves-effect waves-light btn grey" onClick={this.props.cancel} style={{marginLeft: '10px'}}>Cancel</a>
                            </div>

                            <Dialog
                                modal={false}
                                open={this.state.loading}
                                contentStyle={{
                                    width: '128px',
                                    maxWidth: 'none',
                                }}
                            >
                                        <CircularProgress size={80} thickness={5} />
                            </Dialog>

                            <Dialog
                                actions={<RaisedButton
                                            label="Ok"
                                            primary={true}
                                            onTouchTap={() => this.setState({errors: {}})}
                                />}
                                modal={false}
                                open={this.state.errors && !!this.state.errors.global}
                            >
                                {this.state.errors.global}
                            </Dialog>
                        </form>
                    </div>
                    
        return (
            <div>
                { form }
            </div>
        )
    }
}

export default PostForm;