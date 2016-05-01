<article class="article1">

<?=$content?>

<?php if (isset($galleryImages)) : ?>
    <?php foreach ($galleryImages as $image) : ?>
        <a class="lightbox" href="<?=$this->url->asset($image['href'])?>">
            <img src="<?=$this->url->asset($image['tn'])?>
            " alt="<?=$image['alt']?>" />
        </a>
    <?php endforeach; ?>
<?php endif; ?>

<?php if (isset($byline)) : ?>
    <footer class="byline">
        <?=$byline?>
    </footer>
<?php endif; ?>

</article>
