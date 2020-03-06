export default function() {
  return [
    {
      title: "Início",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Listar Post",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/listar-posts",
    },
    {
      title: "Novo Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-post",
    }
  ];
}
