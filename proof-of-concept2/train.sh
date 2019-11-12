#!/usr/bin/env bash
CUDA_VISIBLE_DEVICES="-1" python -m object_detection.model_main \
    --logtostderr \
    --model_dir=train_dir \
    --sample_1_of_n_eval_examples=1 \
    --pipeline_config_path="train_files/ssd_mobilenet.config"
