#!/usr/bin/env bash
CUDA_VISIBLE_DEVICES="-1" python -m object_detection.model_main --logtostderr--model_dir=eval_dir --checkpoint_dir=train_dir --pipeline_config_path=train_files/ssd_mobilenet.config --run_once True
