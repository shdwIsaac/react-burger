export const fetchData = async (state, setState) => {
    const url = "https://norma.nomoreparties.space/api/ingredients";
    try {
        setState({ ...state, hasError: false, isLoading: true });
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ответ сети был не ok.');
        }
        const dataJson = await response.json();
        setState({ ...state, data: dataJson.data, isLoading: false })
        console.log(dataJson.data);
    } catch (error) {
        setState({ ...state, hasError: true, isLoading: false });
        console.log("error", error);
    }
};