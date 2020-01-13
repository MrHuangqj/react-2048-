import React from 'react';
import style from './index.scss';
import colors from './colors.json';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageX: 0,
      pageY: 0,
      post: [
        { number: 2 }, { number: 2 }, { number: 0 }, { number: 0 },
        { number: 4 }, { number: 0 }, { number: 0 }, { number: 0 },
        { number: 4 }, { number: 2 }, { number: 32 }, { number: 0 },
        { number: 8 }, { number: 16 }, { number: 0 }, { number: 0 },
      ],
      score: 0
    }
  }

  onTouchStart = (params) => {
    // console.log('onTouchStart', params.targetTouches[0].pageX);
    this.setState({
      pageX: params.targetTouches[0].pageX,
      pageY: params.targetTouches[0].pageY
    });
  }

  onTouchEnd = (params) => {
    // console.log('onTouchEnd', params.changedTouches[0].pageX);
    let { pageX, pageY } = params.changedTouches[0]
    let offsetY = pageY - this.state.pageY,
      offsetX = pageX - this.state.pageX
    let offset = Math.abs(offsetX) - Math.abs(offsetY)
    if (offset > 0)
      offsetX > 0 ? this.rightMove() : this.leftMove()
    else offsetY > 0 ? this.downMove() : this.upMove()
    // this.creat()
    // this.leftMove()
    // console.log('onTouchEnd', params);
  }
  init = () => {
    let list = this.state.post.map(() => {
      return { number: 0 }
    })
    this.setState({
      post: list
    }, () => {
      this.creat()
    });

  }
  creat = () => {
    let post = [...this.state.post]
    var list = []
    // let score = 0
    this.state.post.forEach((item, index) => {
      // if (item.number > 2) score += item.number
      if (item.number === 0) list.push(index)
    })
    // this.props.setScore(score)
    if (list.length === 0) {
      alert("游戏结束")
      this.init()
      return
    }

    let index = parseInt(Math.random() * (list.length), 10);
    // console.log(index);
    post[list[index]] = {
      number: 2
    }
    console.log(index, list, list[index]);
    this.setState({
      // score: score,
      post: post
    });
    // console.log(list, parseInt(Math.random() * (this.state.post.length + 1), 10));
  }
  downMove = () => {
    let stack = [[], [], [], []]
    let stackResult = []
    this.state.post.forEach((item, index) => {
      if (item.number === 0) return
      stack[index % 4].push(item)
    })
    let stackChange = this.baseMove(stack, true)

    stackChange.forEach((item, index) => {
      item.forEach((titem, tindex) => {
        stackResult[index + tindex * 4] = titem
      })
    })

    // console.log(stack);
    //   console.log(stackChange);
    //   console.log(stackResult);
    if (this.sameCheck(stackResult)) return

    this.setState({
      post: stackResult
    }, () => {
      this.creat()
    });
  }
  upMove = () => {
    let stack = [[], [], [], []]
    let stackResult = []
    this.state.post.forEach((item, index) => {
      if (item.number === 0) return
      stack[index % 4].push(item)
    })
    let stackChange = this.baseMove(stack)

    stackChange.forEach((item, index) => {
      item.forEach((titem, tindex) => {
        stackResult[index + tindex * 4] = titem
      })
    })

    // console.log(stack);
    //   console.log(stackChange);
    //   console.log(stackResult);
    if (this.sameCheck(stackResult)) return

    this.setState({
      post: stackResult
    }, () => {
      this.creat()
    });
  }
  rightMove = () => {
    let stack = [[], [], [], []]
    let stackResult = []
    this.state.post.forEach((item, index) => {
      if (item.number === 0) return
      stack[Math.floor(index / 4)].push(item)
    })

    let stackChange = this.baseMove(stack, true)
    stackChange.forEach((item, index) => {
      item.forEach((titem, tindex) => {
        stackResult.push(titem)
      })
    })

    // console.log(stack);
    //   console.log(stackChange);
    //   console.log(stackResult);
    if (this.sameCheck(stackResult)) return

    this.setState({
      post: stackResult
    }, () => {
      this.creat()
    });
  }
  leftMove = () => {
    let stack = [[], [], [], []]
    let stackResult = []
    this.state.post.forEach((item, index) => {
      if (item.number === 0) return
      stack[Math.floor(index / 4)].push(item)
    })
    let stackChange = this.baseMove(stack)

    stackChange.forEach((item, index) => {
      item.forEach((titem, tindex) => {
        stackResult.push(titem)
      })
    })

    // console.log(stack);
    //   console.log(stackChange);
    //   console.log(stackResult);
    if (this.sameCheck(stackResult)) return
    this.setState({
      post: stackResult
    }, () => {
      this.creat()
    });
  }
  baseMove = (stack, reverse = false) => {
    let stackChange = [[], [], [], []]
    let score = this.state.score
    if (reverse) stack.forEach(item => item.reverse())

    stack.forEach((item, index) => {
      if (item.length >= 2) {
        let list = [...item]
        var tiao = false;
        for (var t = 0; t < item.length; t++) {
          if (!tiao) {
            if (t === item.length - 1) {
              stackChange[index].push(list[t])
              break
            }
            if (list[t].number === list[t + 1].number) {
              stackChange[index].push({
                number: list[t].number * 2
              })
              score += list[t].number * 2
              tiao = true
            } else {
              stackChange[index].push(list[t])
            }

          } else {
            tiao = false
          }
        }
      } else {
        stackChange[index] = item
      }
      // console.log('11111', stackChange[index]);
      // stackChange[index].reverse()
      let time = 4 - stackChange[index].length
      for (let i = 0; i < time; i++) {
        stackChange[index].push({
          number: 0
        })
      }
      if (reverse) stackChange[index].reverse()
    })


    this.setState({
      score: score
    }, () => {
      this.props.setScore(this.state.score)
    });
    return stackChange
  }
  /**
   * @description: 相同检查
   * @param {type} 
   */
  sameCheck = (newValue) => {
    console.log(newValue, this.state.post);
    for (var i = 0; i < newValue.length; i++) {
      if (newValue[i].number !== this.state.post[i].number) return false
    }
    return true
  }


  render () {
    const color = new Map(colors)
    return (
      <div
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        className={style.content}>
        {
          this.state.post.map((item, index) => {
            return <div key={index} style={color.get(item.number)} className={style.block} >{item.number ? item.number : ''}</div>
          })
        }
      </div >
    );
  }
}

export default Content

