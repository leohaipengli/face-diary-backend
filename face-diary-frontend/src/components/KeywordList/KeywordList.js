import React, { Component } from 'react';
import './KeywordList.css';

class KeywordList extends Component {
    getWords() {
        return this.props.keywordList;
    }

    render() {
        let itemList = this.getWords();

        let closeIcon = (item,id)=>{
          return null;
        };

        if(this.props.closeIcon === true){
          closeIcon = (item,id)=>{
            return (<i className="fa fa-times" onClick={(e)=>this.props.onCloseIconClick(e,item,id)}></i>)
          };
        }

        return (
            <div className="container keyword-list">
                <div className="row">
                {
                    itemList.map((item, j) => 
                        <span className="keyword-item" key={j}><em>{item}</em>{closeIcon(item,j)}</span>
                    )
                }
                </div>
            </div>
        );
    }
}

export default KeywordList;
