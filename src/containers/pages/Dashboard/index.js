import React, { Component, Fragment } from 'react'
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI } from '../../../config/redux/action'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'; 

import './Dashboard.scss'

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }
    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData===null){
            this.props.history.push('/login');
        }else{
        this.props.getNotes(userData.uid)
        }
    }
    handelSaveNotes = () => {
        const { title, content, textButton, noteId } = this.state
        const { saveNotes, updateNotes } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if(textButton === 'SIMPAN'){
        saveNotes(data)
        }else {
            data.noteId = noteId;
        updateNotes(data)
        }
        console.log(data)
    }
    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    updateNotes = (note) => {
        console.log(note)
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }
    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }
    deleteNote = (e, note) => {
        e.stopPropagation();
        const {deleteNotes} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNotes(data)
    }
    alert = () => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => alert('Click Yes')
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        })
      };

    render() {
        const { title, date, content, textButton } = this.state;
        const { notes } = this.props;
        const { updateNotes, cancelUpdate, deleteNote, alert } = this;
        console.log('notes: ', notes)
        return (
            <div className='container'>
                <div className='input-form'>
                    <input placeholder='Title' className='input-title' value={title} onChange={(e) => this.onInputChange(e, 'title')}></input>
                    <textarea placeholder='Content' className='input-content' value={content} onChange={(e) => this.onInputChange(e, 'content')}></textarea>
                    <div className='action-wrapper'>
                        {
                            textButton === 'UPDATE' ? (
                                <button className='save-btn cancel' onClick={cancelUpdate}>Cancel</button>
                            ) : <div />
                        }
                        <button className='save-btn' onClick={this.handelSaveNotes}>{textButton}</button>
                        
                    </div>
                </div>
                <br />
                {
                    notes.length > 0 ? (
                        <Fragment>{
                            notes.map(note => {
                                return (
                                    <div className='card-content' key={note.id} onClick={() => updateNotes(note)}>
                                        <p className='title'>{note.data.title}</p>
                                        <p className='date' >{note.data.date}</p>
                                        <p className='content'>{note.data.content}</p>
                                        <div className='delete-btn' onClick={(e) => deleteNote (e, note)}>x</div>
                                    </div>
                                )
                            })
                        }
                        </Fragment>

                    ) : <div />
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})
const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data))


})
export default connect(reduxState, reduxDispatch)(Dashboard);