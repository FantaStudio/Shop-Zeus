import { DialogActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";
import { secondaryThemeColor } from "../../../../../../helpers/colors";
import { useUploadFile } from "../../../../../../hooks/useUploadFile";
import products from "../../../../../../store/products";
import UploadArea from "../../../../../System/UploadArea";
import ZeusButton from "../../../../../System/ZeusButton";
import Alert from "./../../../../../System/Alert";

const useStyles = makeStyles({
  imageBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    color: secondaryThemeColor,
  },
});

const ReplaceImage = ({ open, setOpen, setDetail, productId }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { file, upload } = useUploadFile();

  const replace = useCallback(async () => {
    if (!file || loading) {
      return;
    }

    setLoading(true);

    const result = await products.replaceImage(productId, file);

    if (result) {
      setDetail((prevState) => {
        return {
          ...prevState,
          imageHref: result?.imageHref,
        };
      });

      setOpen(false);
    }

    setLoading(false);
  }, [file, loading, productId, setDetail, setOpen]);

  return (
    <Alert
      open={open}
      setOpen={setOpen}
      customTitle="Замена изображения"
      content={
        <>
          <div className={classes.imageBlock}>
            <h2 className={classes.header}>Загрузите изображение</h2>

            <UploadArea file={file} upload={upload} />
          </div>

          <DialogActions>
            <ZeusButton onClick={replace} loading={loading} disabled={!file}>
              Заменить
            </ZeusButton>
          </DialogActions>
        </>
      }
      size="md"
    />
  );
};

export default ReplaceImage;
