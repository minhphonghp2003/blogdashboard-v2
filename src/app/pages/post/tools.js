//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Marker from "@editorjs/marker";
//@ts-ignore
import InlineCode from "@editorjs/inline-code";
//@ts-ignore
import Underline from "@editorjs/underline";
//@ts-ignore
import ChangeCase from "editorjs-change-case";
//@ts-ignore
import Strikethrough from "@sotaproject/strikethrough";
//@ts-ignore
import Delimiter from "@editorjs/delimiter";
//@ts-ignore
import Quote from "@editorjs/quote";
//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore
import Embed from "@editorjs/embed";
//@ts-ignore
import InlineImage from "editorjs-inline-image";
//@ts-ignore
import editorjsCodeflask from "@calumk/editorjs-codeflask";
//@ts-ignore
import Superscript from "editorjs2-superscript";
//@ts-ignore
import Subscript from "editorjs-subscript";
//@ts-ignore
import NestedList from "@editorjs/nested-list";
export let Tools = {
  subscript: {
    class: Subscript,
  },

  superscript: {
    class: Superscript,
  },

  code: editorjsCodeflask,

  image: {
    class: InlineImage,
    inlineToolbar: true,
    config: {
      embed: {
        display: true,
      },
      unsplash: {
        appName: "blog",
        apiUrl:
          "https://api.unsplash.com/photos/?client_id=E8AD2LDvGauNI1CBsWBRxfDA3hLV-E6T4c3KB-n0O_M",
        maxResults: 30,
      },
    },
  },
  embed: {
    class: Embed,
    
    config: {
      services: {
        youtube: true,
        // coub: true,
        // facebook: true,
        // instagram: true,
        // twitter: true,
        // imgur: true,
        // codepen: true,
        // pinterest: true,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
  },
  delimiter: Delimiter,
  quote: Quote,

  strikethrough: Strikethrough,
  changeCase: {
    class: ChangeCase,
    config: {
      showLocaleOption: true, // enable locale case options
      locale: "tr", // or ['tr', 'TR', 'tr-TR']
    },
  },
  underline: Underline,
  inlineCode: {
    class: InlineCode,
  },
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  marker: {
    class: Marker,
  },
};
