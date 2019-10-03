export default function (callback = null) {
    window.onafterprint = callback;
    window.print();
}
