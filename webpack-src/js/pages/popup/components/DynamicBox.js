/**
 * Author: DrowsyFlesh
 * Create: 2018/10/21
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {createTab} from 'Utils';

const FeedsContainer = styled.div.attrs({className: 'feeds-container'})`
  padding: 8px 0 8px 10px;
  max-height: 395px;
  overflow: auto;
`;
const FeedBox = styled.div.attrs({className: 'feed-box'})`
  position: relative;
  margin-bottom: 1px;
  cursor: pointer;
  &:hover {
    .feed-img {
      filter: grayscale(0.3) brightness(0.6);
      background-size: 100% auto;
    }
    .feed-info {
      opacity: 1;
    }
  }
  &:last-of-type {
    margin-bottom: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FeedImg = styled.div.attrs({className: 'feed-img'})`
  width: 200px;
  height: 85px;
  background-size: 130% auto;
  background-position: center;
  filter: grayscale(0.5) brightness(0.4);
  transition: all 0.5s;
`;

const FeedTitle = styled.h4.attrs({className: 'feed-title'})`
  position: absolute;
  bottom: 4px; 
  width: 230px;
  margin: 0;
  transform: scale(0.8) translateX(-20px);
  font-size: 12px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #fff;
`;

const FeedInfo = styled.div.attrs({className: 'feed-info'})`
  display: flex;
  justify-content: space-between;
  width: 230px;
  position: absolute;
  top: 5px;
  left: 0px;
  font-size: 12px;
  transform: scale(0.8) translateX(-20px);
  transition: all 0.3s;
  color: #fff;
  opacity: 0;
`;

export class DynamicBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedList: [],
        };
    }

    componentWillMount() {
        chrome.runtime.sendMessage({
            commend: 'getDynamicList',
        }, (feedList) => {
            console.log(feedList);
            this.setState({feedList});
        });
    }

    render() {
        const {feedList} = this.state;
        return <FeedsContainer>
            {_.map(feedList, (feed, index) => {
                const {addition} = feed;
                return (
                    <FeedBox key={index} onClick={() => createTab(addition.link)}>
                        <FeedImg style={{
                            backgroundImage: `url(${addition.pic})`,
                        }}/>
                        <FeedTitle>{addition.title}</FeedTitle>
                        <FeedInfo><span>{addition.author}</span><span>{addition.duration}</span></FeedInfo>
                    </FeedBox>
                );
            })}
        </FeedsContainer>;
    }
}