import { UseAppDispatch, UseAppSelector } from "./ReduxProvider";
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch: UseAppDispatch = useDispatch;
export const useAppSelector: UseAppSelector = useSelector;
