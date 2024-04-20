### Hưỡng dẫn defi

1. Add liquidity

- nhập số lượng token0, số lượng token 1, ví dụ add 10000 token 0 và 10.000 token 1
- Cần approve token 0 và token 1 cho MM. Gọi hàm approve vì token 0 và 1 sử dụng hàm transferFrom.

- Khi mà add liquidity thì 2 reserve sẽ được update (tạo thanh khoản cho pool)
- Có nghĩa là trong pool đang có 100.000 token0 và 100.000 token 1.

- Kiểm tra đã mint ra bao nhiêu đồng token share ở trong hàm BalanceOf thì sẽ có 100.000 LP Token
- Total supply: 100.000 tônge LP token được sinh ra.

- Hàm swap có nghĩa là: Khi swap đồng này qua đồng này thì sẽ bị trượt giá theo công thức constant key, bỏ vào 100.000 đồng A sẽ ko lấy được 100.000 đồng B => chỉ có lấy ít hơn thôi.

- remove liquidity:
