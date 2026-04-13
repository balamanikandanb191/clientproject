Add-Type -AssemblyName System.Drawing

function Create-SquareFavicon {
    param (
        [string]$SrcPath,
        [string]$DestPath,
        [int]$Size
    )
    
    $srcImg = [System.Drawing.Image]::FromFile($SrcPath)
    
    $destImg = New-Object System.Drawing.Bitmap($Size, $Size)
    $graphics = [System.Drawing.Graphics]::FromImage($destImg)
    
    # Make background transparent
    $graphics.Clear([System.Drawing.Color]::Transparent)
    
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $scale = [math]::Min($Size / $srcImg.Width, $Size / $srcImg.Height)
    $w = [int]($srcImg.Width * $scale)
    $h = [int]($srcImg.Height * $scale)
    $x = [int](($Size - $w) / 2)
    $y = [int](($Size - $h) / 2)

    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $graphics.DrawImage($srcImg, $rect)
    
    $destImg.Save($DestPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $graphics.Dispose()
    $destImg.Dispose()
    $srcImg.Dispose()
}

$logoPath = "f:\CrackOne - Copy\client\public\logo.png"
Create-SquareFavicon -SrcPath $logoPath -DestPath "f:\CrackOne - Copy\client\public\favicon-192x192.png" -Size 192
Create-SquareFavicon -SrcPath $logoPath -DestPath "f:\CrackOne - Copy\client\public\favicon-512x512.png" -Size 512
Create-SquareFavicon -SrcPath $logoPath -DestPath "f:\CrackOne - Copy\client\public\apple-touch-icon.png" -Size 180
Create-SquareFavicon -SrcPath $logoPath -DestPath "f:\CrackOne - Copy\client\public\favicon.ico" -Size 48

Write-Host "Icons generated successfully!"
