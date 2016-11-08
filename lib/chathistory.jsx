import React from 'react';
import Markdown from 'react-remarkable';

export default
class ChatHistory extends React.Component {

  constructor() {
    super();
    this.state = { msgs: [] };
  }

  shouldComponentUpdate(nextProps) {
    const next = nextProps.messages;
    const current = this.props.messages;
    return next[next.length - 1] !== current[current.length - 1];
  }

  componentDidUpdate() {
    const panel = this.refs.chat_container;
    if (panel.lastChild) panel.lastChild.scrollIntoView();
  }

  render() {
    const messageList = this.props.messages.map((message, idx) => {
      const actualMessage = message.split(']:');
      return (
        <li key={idx} style={this.props.myStyle.list_items}>
          {actualMessage[0]}]:<Markdown
                                source={actualMessage[1]}
                                options={{
                                  html: true,
                                  linkify: true,
                                  typographer: true
                                }}
                              />
        </li>
      );
    });
    return (
      <div ref={'chat_container'} style={this.props.myStyle.container}>
        {messageList}
      </div>
    );
  }
}

class CommandBox extends React.Component {
  render() {
    const textDec = {
      listStyleType: 'none',
      wordWrap: 'break-word',
      color: 'white',
    };
    return (
        <div style={this.props.myStyle.commandBox}>
          <li style={textDec}>
            CommandBox
          </li>
          <li style={textDec}>
            <button
              title={'Checks your mood'}
              className={"foo"}
              onClick={this.props.sendCmd}>
              !hyebot.sentiment=>
            </button>
          </li>
        </div>
    );
  }
}

class CheatSheet extends React.Component {
  render() {
    const header = {
      textAlign: 'center',
      color: 'white',
      listStyleType: 'none',
    };
    return (
        <div style={this.props.myStyle.cheastsheet}>
          <li style={header}>
            Markdown Cheatsheet
          </li>

<Section content=
{`
  # H1
  ## H2
  ### H3
  #### H4
  ##### H5
  ###### H6

  Alternatively, for H1 and H2, an underline-ish style:

  Alt-H1
  ======
  Alt-H2
  ------
`} title={"Headers"}
/>
<Section content=
{`
  Emphasis, aka italics, with *asterisks* or _underscores_.

  Strong emphasis, aka bold, with **asterisks** or __underscores__.

  Combined emphasis with **asterisks and _underscores_**.

  Strikethrough uses two tildes. ~~Scratch this.~~
`} title={"Emphasis"}
/>
<Section content=
{`
  1. First ordered list item
  2. Another item
  ⋅⋅* Unordered sub-list.
  1. Actual numbers don't matter, just that it's a number
  ⋅⋅1. Ordered sub-list
  4. And another item.

  ⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

  ⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
  ⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
  ⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

  * Unordered list can use asterisks
  - Or minuses
  + Or pluses
`} title={"Lists"}
/>
<Section content=
{`
  [I'm an inline-style link](https://www.google.com)

  [I'm an inline-style link with title](https://www.google.com "Google's Homepage")

  [I'm a reference-style link][Arbitrary case-insensitive reference text]

  [I'm a relative reference to a repository file](../blob/master/LICENSE)

  [You can use numbers for reference-style link definitions][1]

  Or leave it empty and use the [link text itself].

  URLs and URLs in angle brackets will automatically get turned into links.
  http://www.example.com or <http://www.example.com> and sometimes
  example.com (but not on Github, for example).

  Some text to show that the reference links can follow later.

  [arbitrary case-insensitive reference text]: https://www.mozilla.org
  [1]: http://slashdot.org
  [link text itself]: http://www.reddit.com
`} title={"Links"}
/>
<Section content=
{`
  Here's our logo (hover to see the title text):

  Inline-style:
  ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

  Reference-style:
  ![alt text][logo]

  [logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
`} title={"Images"}
/>
<Section content=
{`
  Here's our logo (hover to see the title text):

  Inline-style:
  ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

  Reference-style:
  ![alt text][logo]

  [logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
`} title={"Images"}
/>
        </div>
    );
  }
}

class Section extends React.Component {
  render() {
    const h2 = {
      marginBottom: '0',
    };
    const pre = {
      marginTop: '0',
    };
    const textDec = {
      listStyleType: 'none',
      textAlign: 'left',
      color: 'white',
    };
    return(
      <li style={textDec}>
        <h2 style={h2}>{this.props.title}</h2>
        <pre style={pre}>
          {this.props.content}
        </pre>
      </li>
    );
  }
}
export {ChatHistory, CommandBox, CheatSheet};
