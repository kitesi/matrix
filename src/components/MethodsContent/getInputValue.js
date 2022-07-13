export default (id) => {
    const el = document.getElementById(id);
    if(!el) {
        console.log(id)
    } else {
        return el.value;
    }
}
