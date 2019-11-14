#!/usr/bin/env bash

INPUT_TYPE=image_tensor
PIPELINE_CONFIG_PATH='train_files/ssd_mobilenet_v1_coco_2018_01_28.config'
TRAINED_CKPT_PREFIX='model_dir/model.ckpt-10000'
EXPORT_DIR='freeze' # {path to folder that will be used for export}
python -m object_detection.export_inference_graph \
    --input_type=${INPUT_TYPE} \
    --pipeline_config_path=${PIPELINE_CONFIG_PATH} \
    --trained_checkpoint_prefix=${TRAINED_CKPT_PREFIX} \
    --output_directory=${EXPORT_DIR}