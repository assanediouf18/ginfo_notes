import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {connect} from 'react-redux';
import {addNote, modifyNote} from './../services/noteSlice';

const mapStateToProps = (state) => {
    return state
};  

class NoteEditingScreen extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.route.params.title,
            content: this.props.route.params.content,
        }
    }

    componentDidMount() {
        const myNotes = this.props.notes;
        this.beforeLeaving = this.props.navigation.addListener("beforeRemove", (e) => {
            if(this.state.title != this.props.route.params.title || this.state.content != this.props.route.params.content)
            {
                let noteID = this.props.route.params.noteID;

                const myPayload = {
                    noteID: noteID,
                    title : this.state.title,
                    content : this.state.content,
                };

                if(noteID == myNotes.length)
                {
                    this.props.dispatch(addNote(myPayload));
                    return;
                }
                this.props.dispatch(modifyNote(myPayload));
            }
        });
    }

    componentWillUnmount() {
        //this.props.navigation.removeEventListener("beforeRemove", this.beforeLeaving);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <TextInput
                            multiline
                            style={styles.screenTitle}
                            placeholder='Titre'
                            defaultValue={this.state.title}
                            onChangeText={(newText) => this.setState({title: newText})}
                        />
                    </View>
                    <View style={styles.body}>
                        <TextInput
                            multiline
                            style={{color: "white", fontSize: 20}}
                            placeholder="Contenu"
                            defaultValue={this.state.content}
                            onChangeText={(newText) => {
                                this.setState({content: newText});
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222',
    },
    innerContainer: {
        flex: 1,
        paddingTop: 50,
        padding: 20,
    },
    screenTitle: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 40,
        fontWeight: "bold",
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: '#009532',
        borderBottomWidth: 1,
        marginBottom: 15,
    },
    body: {
        flex: 9,
    },
});

export default connect(mapStateToProps)(NoteEditingScreen);