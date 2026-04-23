"use client";

import React from "react";
import ReactQuill, { Quill } from "react-quill-new";
import Delta from "quill-delta";
import "react-quill-new/dist/quill.snow.css";

const Link = Quill.import("formats/link") as {
  sanitize: (url: string) => string;
};
Link.sanitize = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;
Quill.register(Link, true);

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchers: [
      [
        Node.ELEMENT_NODE,
        (node: Node, delta: any) => {
          if (node instanceof HTMLElement && node.nodeName === "SPAN") {
            const ops = delta.ops?.map((op: any) => {
              if (op.attributes) {
                const { background, color, ...rest } = op.attributes;
                return { ...op, attributes: rest };
              }
              return op;
            });
            return new Delta(ops);
          }
          return delta;
        },
      ],
    ],
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

export default function QuillEditor(props: any) {
  return (
    <ReactQuill theme="snow" modules={modules} formats={formats} {...props} />
  );
}
