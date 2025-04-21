resource "aws_iam_role" "peppa_mcp_server" {
  name = "peppa-mcp-server"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "peppa_mcp_server" {
  role       = aws_iam_role.peppa_mcp_server.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "archive_file" "peppa_mcp_server" {
  type        = "zip"
  source_dir  = "${path.root}/../src"
  output_path = "${path.root}/tmp/function.zip"
}

resource "aws_lambda_function" "peppa_mcp_server" {
  function_name    = "peppa_mcp_server"
  filename         = data.archive_file.peppa_mcp_server.output_path
  source_code_hash = data.archive_file.peppa_mcp_server.output_base64sha256
  role             = aws_iam_role.peppa_mcp_server.arn
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  memory_size      = 512
  timeout          = 30
}

