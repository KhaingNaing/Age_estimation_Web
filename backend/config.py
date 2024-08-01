import torch.cuda

config = {
    # Image dimensions
    "img_width": 128,                                      
    "img_height": 128,
    "img_size": 128,

    # Image normalization parameters
    "mean": [0.5, 0.5, 0.5], 
    "std": [0.5, 0.5, 0.5],

    # Model configuration 
    "model_name": "simple_cnn",

    # Device configuration
    "device": "cpu",

    # Paths for inference result
    "image_path": "img_test/",

    # Training parameters
    "epochs": 30,
    "batch_size": 64,
    "eval_batch_size": 128,

    # Random seed for reproducibility
    "seed": 42,

    # Optimization parameters
    "lr": 0.001, # Learning rate
    "wd": 0.0001,  # Weight decay

    # Checkpoint and logging configuration
    "save_interval": 1,
    "reload_checkpoint": None,
    "log_dir": "logs",
}
