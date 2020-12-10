import React, {Component, Fragment} from 'react'
import { getDataFromCreator } from '../../../config/redux/action'
import { connect } from 'react-redux'
import './Home.scss'

class Home extends Component{
    componentDidMount(){
        const {getCreators} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData===null){
            this.props.history.push('/login');
        }else{
        getCreators(userData.uid)
        } 
    }
    render(){
        const {creators} = this.props;
        console.log('creators : ',creators)
        return(
            <div className='container'>
                {
                    creators.length > 0 ? (
                        <Fragment>
                            {
                                creators.map(creator => {
                                    return(
                                    <div className='card-creator' key={creator.id}>
                                        <div className='img-holder'>
                                            <img src={creator.data.profileImg} id='img' className='img' />
                                        </div>
                                        <p className='title'>{creator.data.name}</p>
                                        <p className='date' >{creator.data.date}</p>
                                        <p className='content'>{creator.data.desc}</p>
                                        {/* <div className='delete-btn' onClick={(e) => deleteCreator (e, creator)}>x</div> */}
                                    </div>
                                    )
                                })
                            }
                        </Fragment>
                    ): <div />
                }
            </div>
        )
    }
}
const reduxState = (state) => ({
    creators: state.creators
})
const reduxDispatch = (dispatch) => ({
    getCreators: (data) => dispatch(getDataFromCreator(data)),
    })
export default connect(reduxState, reduxDispatch)(Home);