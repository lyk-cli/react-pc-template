/**
 * demo action
 */
export const ENTER_PAGE = "ENTER_PAGE";
export const LEAVE_PAGE = "LEAVE_PAGE";

export const enterPageAction = () => async dispatch => {
  // const { currentModel, currentPage } = s().behaviorReducer;
  // console.log("====================================");
  // console.log(currentModel, currentPage);
  // console.log("====================================");
  dispatch({
    type: ENTER_PAGE,
    data: {
      inTime: new Date().getTime()
      // currentModel: model,
      // currentPage: location.href,
      // previousModel: currentModel,
      // previousPage: currentPage
    }
  });
};
