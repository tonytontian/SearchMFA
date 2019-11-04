#!/usr/bin/bash
python -m object_detection.model_main --logtostderr --train_dir=train_dir --pipeline_config_path=train_files/ssd_mobilenet.config
